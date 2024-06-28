import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdKeyboardBackspace } from "react-icons/md";
import Carousel from "../components/carousel/Carousel";
import FlashcardPDFGenerator from "../components/pdfGenerator/pdfGenerator";
import { useState } from 'react';


// Route component to Show the details of the FlashCard
export default function FlashcardDetails() {
    const { index } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardDetail = useSelector(state => state.cards[index]);  // Access the specific card using the index

    return (
        <div className="w-[90vw] sm:w-[80vw] mx-auto min-h-[40vh]">
            {cardDetail ? (
                <>
                    <div className="w-full flex gap-3 pt-2">
                        <div>
                            <button aria-label="previous-page">
                            <Link to='/MyFlashCard' aria-label="previous-page"><MdKeyboardBackspace className=" text-3xl" /></Link>
                            </button>
                        </div>
                        <div className="pl-2 ">
                            <h2 className="text-xl font-semibold">
                                {cardDetail.groupTitle}
                            </h2>
                            <div className="text-gray-500">
                                {cardDetail.groupDescription}
                            </div>
                        </div>
                    </div>

                    {/* Card Items started */}
                    <div className="w-full flex flex-col lg:flex-row gap-5 mt-5">
                        <ol className="h-150px lg:h-[220px] w-full item-term bg-white rounded-lg flex overflow-auto lg:flex-col gap-1 inline-block lg:max-w-[180px] p-2 text-gray-500">
                            <li className="px-2 py-1 border-r-2 lg:border-b-2 lg:border-r-0 border-black lg:border-gray-200">
                                Flashcards
                            </li>
                            {cardDetail.cardItems.map((item, index) => (
                                <li key={index} className="border-r-2 lg:border-0">
                                    <button onClick={() => setCurrentIndex(index)} className={`text-sm font-medium px-2 lg:p-2 ${currentIndex === index ? 'active-term' : ''}`}>{item.term}</button>
                                </li>
                            ))}
                        </ol>
                        {/* The Carousel Component renders the CardItems-Image with the respected Defintion */}
                        <Carousel cardDetail={cardDetail} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />

                        {/* This component renders the Download, Print & Share buttons. */}
                        <FlashcardPDFGenerator cardDetail={cardDetail} />
                    </div>
                </>
            ) : (
                <div className="flex flex-col gap-5 items-center justify-center min-h-[300px]">
                    <p className="text-lg">Oops! No card details found.</p>
                    <button className="border-2 border-red-500 p-1 rounded-lg bg-white"><Link to={'/'}>Create Your New FlashCard</Link></button>
                </div>
            )}
        </div>
    );
}