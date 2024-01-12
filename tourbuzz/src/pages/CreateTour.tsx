import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createRef, useState } from "react"
import ErrorAlert from "@src/components/ErrorAlert"
import PageHeader from "@src/components/PageHeader"
import { useNavigate } from "react-router-dom"
import TourCreateCard, { TourCreateRef } from "@src/components/TourCreateCard";
import TourLogCreateCard, { TourLogCreateRef } from "@src/components/TourLogCreateCard";
import TourPackageCreateCard, { TourPackageCreateRef } from "@src/components/TourPackageCreateCard";
import { CreateTourType, parseErrorMessage } from './../types';
import { toast } from "react-toastify";
import { postTour } from "@src/functions/api";
import { useQueryClient } from "react-query";

const CreateTour = () => {
    const [reloadKey, setReloadKey] = useState(1)
    const tourCreateRef = createRef<TourCreateRef>()
    const tourLogCreateRef = createRef<TourLogCreateRef>()
    const tourPackageCreateRef = createRef<TourPackageCreateRef>()

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        if(!tourCreateRef.current || !tourLogCreateRef.current || !tourPackageCreateRef.current){
            return;
        }
        setError("")

        const tour = tourCreateRef.current.getData();
        if(!tour.organizer || !tour.avatar){
            return;
        }

        const tour_logs = tourLogCreateRef.current.getData();
        tour_logs.forEach(e => {
            if(e.hotel == null){
                toast.error("Tour logs must contain hotel data");
                return;
            }
        })

        const packages = tourPackageCreateRef.current.getData();
        packages.forEach(e => {
            if(e.price == null){
                toast.error("Package must contain price data");
                return;
            }
        })

        const data:CreateTourType = {
            tour: {
                ...tour,
                organizers_id: tour.organizer.id,
                images_id: tour.avatar.id,
                image_ids: tour.images.map(e => e.id)
            },
            tour_logs: tour_logs.map(e => {
                return {
                    ...e, 
                    hotels_id: Number(e.hotel?.id),
                    place_ids: e.places.map(c => c.id), 
                    image_ids: e.images.map(c => c.id)
                }
            }),
            packages: packages.map(e => {
                return {
                    ...e,
                    price: Number(e.price)
                }
            })
        }

        setLoading(true)
        postTour({...data}).then(res => {
            if (res.error) {
                toast.error("Tour submission failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Tour Submitted 💪")
                queryClient.invalidateQueries("tours")
                setLoading(false)
                resetData()
                navigate("/tours")
            }

        })
    }

    const resetData = () => {
        tourCreateRef.current?.clearData()
        tourLogCreateRef.current?.clearData()
        tourPackageCreateRef.current?.clearData()
        setReloadKey(reloadKey + 1)
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title="Create A Tour"
                subtitle="Before writing the article please review the contents carefully 🧐"
                right={
                    <button className="btn btn-primary" onClick={resetData}>Reset Data</button>
                }
            />

            <div className="grid grid-cols-1 gap-3" key={reloadKey}>
                <TourCreateCard ref={tourCreateRef} />
                <TourLogCreateCard ref={tourLogCreateRef} />
                <TourPackageCreateCard ref={tourPackageCreateRef} />
            </div>

            {error.length > 0 && (
                <div>
                    <ErrorAlert error={error} setError={setError} />
                </div>
            )}

            <div className="p-5 card bg-base-200">
                <div className="flex justify-between">
                    <button className="btn btn-outline" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>

                    <div>
                        <button className="btn btn-info w-48" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Submitting
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateTour