import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import DeleteFlashCardButton from "../components/deleteFlashCard/DeleteFlashCard"

// Route component to show all the FlashCards.
export default function MyFlashCard() {
    const myCards = useSelector((state) => state.cards)
    const [seeAll, setSeeAll] = useState(false)

    // Manage the number of cards to be displayed.
    const displayedCards = seeAll ? myCards : myCards.slice(0, 6)

    return (
        <div className="w-[90vw] sm:w-[80vw] mx-auto mt-3">
            <ul className="w-full m-0 p-0 flex flex-wrap gap-2 justify-between min-h-[60vh]">
                {displayedCards.map((card, index) => (
                    <li className="mx-[20px] w-full sm:mx-0 sm:w-[250px] md:w-[300px] relative" key={index}>
                        <div className="inline-block w-full flex justify-center absolute left-0 top-0 z-10">
                            <div style={{ width: '60px', height: '60px' }} className="relative">
                                <img src={card.displayPic ? card.displayPic : 'placeholder-image-url'} alt={`Flashcard ${index}`} className="absolute inset-0 h-full w-full object-cover border-2 rounded-full" />
                            </div>
                        </div>

                        <div className="w-full min-h-[200px] sm:h-[200px] bg-white border-2 rounded-lg mt-8 pt-8 px-4 pb-4 relative">
                            <DeleteFlashCardButton index={index} />
                            <h3 className="text-center text-lg font-medium">{card.groupTitle}</h3>
                            <p className="text-center py-1 text-gray-500 max-h-[53px] text-sm overflow-auto">{card.groupDescription.length < 70 ? card.groupDescription : card.groupDescription.slice(0, 65) + `...`}</p>
                            <p className="text-center py-1 text-gray-500 text-base">{`${card.cardItems.length} Cards`}</p>
                            <div className="text-center py-1">
                                <Link to={`/${index}`}>
                                    <button className="font-medium border-2 border-red-500 text-red-500 px-7 py-1 rounded-sm">View Cards</button>
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {myCards.length > 6 && (
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setSeeAll(!seeAll)}
                        className="font-medium text-red-500"
                    >
                        {seeAll ? "See Less" : "See All"}
                    </button>
                </div>
            )}
        </div>
    )
}
