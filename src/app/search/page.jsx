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
	const user = session.user.id;

	const favoritesObj = await prisma.favorite.findMany({
		where: {
			userId: user,
		},
		select: {
			toolId: true,
		},
	});
	const favorites = favoritesObj.map((f) => f.toolId);
	const categories = await prisma.category.findMany();

	const favCheck = searchParams?.favorites || "";
	const dateFrom = searchParams?.datefrom || "";
	const dateTo = searchParams?.dateto || "";
	const sortOption = searchParams?.sort || "";
	const query = searchParams?.query || "";
	let categoryFilter = categories.map((c) => c.name);
	if (searchParams?.category) {
		categoryFilter = [searchParams?.category];
	}

	//TODO: Add pagination
	const currentPage = Number(searchParams?.page) || 1;

	const tools = await prisma.tool.findMany({
		orderBy: [
			{ createdAt: sortOption === "createdAtdesc" ? "desc" : undefined },
			{ name: sortOption === "namedesc" ? "desc" : "asc" },
		],
		include: {
			reservations: true,
			favorites: true,
		},
		where: {
			name: {
				startsWith: query,
			},
			category: {
				name: { in: categoryFilter },
			},
			favorites: favCheck
				? {
						some: {
							userId: user,
						},
				}
				: undefined,
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
			<SearchFilter
				categories={categories}
				tools={tools}
				favorites={favorites}
			/>
		</>
	);
}
