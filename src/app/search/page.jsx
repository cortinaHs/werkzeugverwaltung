import { redirect } from "next/navigation";
import { auth } from "../auth";
import { SearchFilter } from "./filter";
import { prisma } from "../../lib/prisma";

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
	const dateFrom = searchParams?.datefrom || "";
	const dateTo = searchParams?.dateto || "";

	const sortOption = searchParams?.sort || "";

	//TODO: Add pagination

	const currentPage = Number(searchParams?.page) || 1;

	const tools = await prisma.tool.findMany({
		orderBy:[
				{createdAt: sortOption === "createdAtdesc" ? "desc" : undefined},
				{name: sortOption === "namedesc" ? "desc" : "asc"},
			],
		include: {
			reservations: true,
		},
		where: {
			name: {
				startsWith: query,
			},
			category: {
				name: { in: categoryFilter },
			},
			reservations: {
				none: {
					OR: [

						{
							AND: [
								{
									startDate: { gte: dateFrom ? new Date(dateFrom) : undefined },
								},
								{ startDate: { lte: dateTo ? new Date(dateTo) : undefined } },
							],
						},
						{
							AND: [
								{ endDate: { gte: dateFrom ? new Date(dateFrom) : undefined } },
								{ endDate: { lte: dateTo ? new Date(dateTo) : undefined } },
							],
						},
					],
				},
			},
		},
	});

	return (
		<>
			<SearchFilter categories={categories} tools={tools} />
		</>
	);
}
