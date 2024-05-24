import { redirect } from "next/navigation";
import { auth } from "../auth";
import { SearchFilter } from "./filter";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }) {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const categories = await prisma.category.findMany();
	const query = searchParams?.query || "";
  let categoryFilter = categories.map((c) => c.name);
    if (searchParams?.category) {
     categoryFilter = [searchParams?.category];
    } 
  
		 
	const currentPage = Number(searchParams?.page) || 1;


	const tools = await prisma.tool.findMany({
		where: {
			name: {
				startsWith: query,
			},

			category: {
				name: { in: categoryFilter },
			},
		},
	});

	return (
		<>
			<SearchFilter categories={categories} tools={tools} />
		</>
	);
}
