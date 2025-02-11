import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Upload from "@mui/icons-material/Upload";

import Image from "../../assets/icons/nopost.png";

interface ImageEntry {
    id: string;
    image: File | null;
    description: string;
}

function ValentinesUpload() {
    const [entries, setEntries] = useState<ImageEntry[]>([
        { id: uuidv4(), image: null, description: "" },
    ]);

    const addEntry = () => {
        if (entries.length < 6) {
            setEntries([...entries, { id: uuidv4(), image: null, description: "" }]);
        }
    };

    const removeEntry = (id: string) => {
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    const handleImageChange = (id: string, file: File | null) => {
        setEntries(entries.map((entry) => (entry.id === id ? { ...entry, image: file } : entry)));
    };

    const handleDescriptionChange = (id: string, description: string) => {
        setEntries(entries.map((entry) => (entry.id === id ? { ...entry, description } : entry)));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        entries.forEach((entry, index) => {
            if (entry.image) {
                formData.append(`image_${index}`, entry.image);
            }
            formData.append(`description_${index}`, entry.description);
            formData.append(`id_${index}`, entry.id);
        });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                console.log("Upload successful");
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="w-[80%] rounded-lg shadow-lg z-10 relative bg-bgColor">
            <form onSubmit={handleSubmit} className="space-y-4 mx-6 my-6">
                {entries.map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-4">
                        <div className="flex-1 space-y-2">
                            <label className="block border-2 border-gray-300 border-dashed rounded-lg p-4 cursor-pointer bg-bgColor hover:bg-gray-100">
                                <div className="text-center text-gray-500">
                                    <p className="text-xs font-semibold font-roboto">
                                        <Upload /> ატვირთე ფოტო
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(entry.id, e.target.files ? e.target.files[0] : null)}
                                    accept="image/*"
                                />
                            </label>
                            <textarea
                                placeholder="ტექსტი"
                                value={entry.description}
                                onChange={(e) => handleDescriptionChange(entry.id, e.target.value)}
                                className="w-full border rounded-md p-2 font-roboto outline-none text-xs resize-none"
                            ></textarea>
                        </div>
                        {entries.length > 1 && (
                            <button type="button" onClick={() => removeEntry(entry.id)} className="p-2 bg-red-500 text-white rounded-md">
                                <RemoveIcon />
                            </button>
                        )}
                    </div>
                ))}
                {entries.length < 6 && (
                    <button type="button" onClick={addEntry} className="w-full p-1 bg-[#D93835] text-white rounded-md font-dejavu tracking-widest">
                        <AddIcon /> დაამატე ფოტო
                    </button>
                )}
            </form>

            <div className="mt-6">
                <div className="flex flex-wrap justify-center gap-3">
                    {/* {entries.map(
                        (entry) =>
                            entry.image && ( */}
                                <div className="relative w-16 h-16 border rounded-md overflow-hidden">
                                    <img
                                        // src={URL.createObjectURL(entry.image)}
                                        src={Image}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            {/* )
                    )} */}
                    {entries.every((entry) => !entry.image) && (
                        <div className="text-gray-400 flex flex-col items-center">
                            <Upload className="w-12 h-12" />
                            <p className="text-xs font-roboto">არცერთი ფოტო არ აირჩიეთ</p>
                        </div>
                    )}
                </div>
            </div>
            <button type="submit" className="w-full p-1 bg-green-500 text-white rounded-md font-dejavu tracking-widest">
                    შეინახე
                </button>
        </div>
    );
}

export default ValentinesUpload;
