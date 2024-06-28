import { MdOutlineDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../state/actions";

// Deletes the FlashCard
export default function DeleteFlashCardButton({ index }) {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteCard(index));
    };

    return (
        <button
            onClick={handleDelete}
            className="absolute z-10 top-1 right-1 text-xl text-red-500 cursor-pointer w-11 h-11 flex items-center justify-center"
            aria-label="Delete"
        >
            <MdOutlineDeleteForever />
        </button>
    );
}
