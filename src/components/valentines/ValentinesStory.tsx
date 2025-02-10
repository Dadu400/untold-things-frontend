import { useNavigate } from "react-router-dom";

export default function ValentinesQuestion() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center gap-y-20">
            <h1 className="text-5xl font-bold font-gakruli">მიუძღვენი ისტორია</h1>
            <button 
                className="px-6 py-2 bg-red-500 rounded-lg flex items-center animate-bounce text-white font-dejavu tracking-widest"
                onClick={() => navigate("/valentinesday/upload")} >
                დაწყება
            </button>
        </div>
    );
}
