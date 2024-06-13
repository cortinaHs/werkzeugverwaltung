import { auth } from "../auth";
import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { ProfileActionDialogs } from "./dialogs";
import { EditProfileSchema } from "../../lib/zod";
import { revalidatePath } from "next/cache";
import { signOut } from "../auth";

export default async function UserProfilePage() {
	const session = await auth();
	if (!session) {
		redirect("/signin");
	}
	const user = session.user.id;

	const userdata = await prisma.user.findUnique({
		where: {
			id: user,
		},
	});

	async function handleDelete() {
		"use server";
		const deleteReservations = prisma.reservation.deleteMany({
			where: {
				userId: user,
			},
		});

		const deleteFavorites = prisma.favorite.deleteMany({
			where: {
				userId: user,
			},
		});

		const deleteTools = prisma.tool.deleteMany({
			where: {
				ownerId: user,
			},
		});

		const deleteUser = prisma.user.delete({
			where: {
				id: user,
			},
		});
		signOut();
		
		const transaction = await prisma.$transaction([
			deleteReservations,
			deleteFavorites,
			deleteTools,
			deleteUser,
		]);
		redirect("/");
	}

	async function handleEdit(formState, formData) {
		"use server";

		const validatedFields = EditProfileSchema.safeParse({
			name: formData.get("name"),
			email: formData.get("email"),
		});
		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}
		const { name, email } = validatedFields.data;
		const street = formData.get("street") || "";
		const houseNumber = formData.get("houseNumber") || "";
		const postalCode = formData.get("postalCode") || "";
		const placeOfResidence = formData.get("placeOfResidence") || "";

		const updateUser = await prisma.user.update({
			where: {
				id: user,
			},
			data: {
				name: name,
				email: email,
				street: street,
				houseNumber: houseNumber,
				postalCode: postalCode,
				placeOfResidence: placeOfResidence,
			},
		});
		revalidatePath("/userprofile", "userprofile");
	}

	return (
		<main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200 ">
				<h1 className="text-4xl font-bold tracking-tight text-gray-900">
					Profilinformationen
				</h1>
			</div>
			<div className="mt-6 border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Name
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{userdata.name}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							E-Mail Adresse
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{userdata.email}
						</dd>
					</div>

					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium leading-6 text-gray-900">
							Adresse
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{userdata.houseNumber &&
							userdata.street &&
							userdata.postalCode &&
							userdata.placeOfResidence
								? `${userdata.street} ${userdata.houseNumber}, ${userdata.postalCode} ${userdata.placeOfResidence}`
								: "Keine Adresse hinterlegt"}
						</dd>
					</div>
				</dl>
			</div>
			<ProfileActionDialogs
				handleDelete={handleDelete}
				userdata={userdata}
				handleEdit={handleEdit}
			/>
		</main>
	);
}
