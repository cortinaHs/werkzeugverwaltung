import { PhotoIcon } from "@heroicons/react/24/solid";
import { FileUploader } from "react-drag-drop-files";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function PhotoUploader({}) {
	const [selectedFile, setSelectedFile] = useState(null);
	const fileTypes = ["JPG", "PNG", "GIF"];

	return (
		<div>
			<label
				htmlFor="photo"
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				Bild
			</label>

			<FileUploader
				handleChange={setSelectedFile}
				name="file-upload"
				types={fileTypes}
				type="file"
				id="file-upload"
			>
				{
					<div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
						<div className="text-center">
							<PhotoIcon
								className="w-12 h-12 mx-auto text-gray-300"
								aria-hidden="true"
							/>
							<div className="flex mt-4 text-sm leading-6 text-gray-600">
								<label
									htmlFor="file-upload"
									className="relative font-semibold text-green-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
								>
									<span>Bild hochladen</span>
									<input
										id="file-upload"
										name="file-upload"
										type="file"
										onChange={(e) => setSelectedFile(e.target.files[0])}
										className="z-10 hidden"
									/>
								</label>
							</div>
							<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
						</div>
					</div>
				}
			</FileUploader>

			<div>
				{selectedFile && (
					<div className="mt-3 text-sm leading-6 text-gray-600">
						<span>{selectedFile.name}</span>
						<button onClick={() => setSelectedFile(null)}>
							<XMarkIcon className="w-5 h-5 py-1" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
