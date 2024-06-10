import { auth } from "../auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CategoryTable } from "./input";
import { revalidatePath } from "next/cache";

export default async function Admin() {
	const session = await auth();

	if (!session) {
		redirect("/signin");
	}

	if (session?.user.role != "admin") {
		redirect("/search");
  }
  const categories = await prisma.category.findMany();
  const users = await prisma.user.findMany();
  
  async function deleteCategory(id) {
    "use server"
    const deleteTools = prisma.tool.deleteMany({ where: { categoryId: id } });
    const deleteCategory = prisma.category.delete({
      where: { id },
    });
    const transaction = await prisma.$transaction([deleteTools, deleteCategory]);
  }
  async function addCategory(formData) { 
    "use server"
    const name = formData.get("name")
    await prisma.category.create({
      data: { name },
    });
  }
  revalidatePath("/admin", "admin");
  
	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Adminbereich
				</h1>
			</div>
      <div className="flex flex-wrap py-6 mt-6 border-gray-100 -border-t md:flex-nowrap">
        
        <CategoryTable categories={categories}  deleteCategory={deleteCategory} addCategory={addCategory} />

				<ScrollArea className="w-1/3 p-4 border rounded-md ">
					<div className="p-4">
						<h4 className="mb-4 text-sm font-medium leading-none">
							Mitglieder
						</h4>
						{users.map((user) => (
							<div key={user.id}>
								<p>{user.name}</p>
								<Separator className="my-2" />
							</div>
						))}
					</div>
				</ScrollArea>
			</div>
		</main>
	);
}
