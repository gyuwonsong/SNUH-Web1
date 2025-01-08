import { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import { BiPlusCircle, BiSolidMicrophone } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // 로딩 아이콘
import { MdCancel } from "react-icons/md"; // 제거 아이콘

const UserInput = ({ onSubmit }) => {
    const [inputText, setInputText] = useState('');
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false); // 업로드 상태 관리

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputText.trim() || files.length) {
            setUploading(true); // 업로드 시작
            await new Promise((resolve) => setTimeout(resolve, 1500)); // 업로드 시뮬레이션 (1.5초)
            onSubmit({ text: inputText, files });
            setInputText('');
            setFiles([]);
            setUploading(false); // 업로드 완료
        }
    };

    const handleFileChange = (e) => {
        setFiles([...files, ...Array.from(e.target.files)]);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handleMicrophoneClick = () => {
        alert("음성 입력 기능이 아직 구현되지 않았습니다.");
    };

    return (
        <div className="w-full">
            {/* 업로드된 파일 리스트 */}
            <div className="flex space-x-2 overflow-x-auto mb-3 p-2 bg-muted-light rounded-lg">
                {files.length > 0 &&
                    files.map((file, index) => (
                        <div
                            key={index}
                            className="w-1/5 min-w-[150px] flex items-center justify-between bg-background p-2 rounded-lg shadow-md"
                        >
                            <span className="truncate text-sm w-[80%]" title={file.name}>
                                {file.name}
                            </span>
                            <MdCancel
                                onClick={() => handleRemoveFile(index)}
                                className="text-primary cursor-pointer text-xl"
                            />
                        </div>
                    ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-row relative items-center">
                <label className="text-2xl mr-3 cursor-pointer">
                    <BiPlusCircle />
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </label>
                <textarea
                    className="bg-muted w-full h-12 p-3 pr-20 rounded-2xl resize-none focus:ring-primary focus:outline-none"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <BiSolidMicrophone
                    onClick={handleMicrophoneClick}
                    className="absolute right-20 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer"
                />
                <button
                    type="submit"
                    className={`absolute right-2 top-1/2 py-1.5 px-5 transform -translate-y-1/2 bg-primary text-primary-foreground rounded-2xl flex items-center ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={uploading}
                >
                    {uploading ? (
                        <AiOutlineLoading3Quarters className="text-xl animate-spin" />
                    ) : (
                        <RiSendPlaneFill className="text-xl" />
                    )}
                </button>
            </form>
        </div>
    );
};

export default UserInput;
