import { redirect } from "next/navigation";
import { auth } from "../auth";
import  {SearchFilter}  from "./filter";
import {prisma } from "../lib/prisma"

export const dynamic = "force-dynamic";

export default async function SearchPage({searchParams}) {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}

  const query = searchParams?.query || "";
    console.log(query);
  const currentPage = Number(searchParams?.page) || 1;


  
	const categories = await prisma.category.findMany();

  const tools = await prisma.tool.findMany(
    {where: {
      name: {
        startsWith: query
      }
    }}
  );

	return (
		<>
			<SearchFilter categories={categories} tools={tools} />
		</>
	);
}