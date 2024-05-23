import { redirect } from "next/navigation";
import { auth } from "../auth";
import  {SearchFilter}  from "./filter";
import {prisma } from "../lib/prisma"


export default async function SearchPage() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  };

const categories = await prisma.category.findMany();

    const tools = await prisma.tool.findMany();
 
  
  return (
		<>
      <SearchFilter categories={categories} tools={tools} />
		</>
	);
}