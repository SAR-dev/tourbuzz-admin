import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createRef, useEffect, useState } from "react"
import ErrorAlert from "@src/components/ErrorAlert"
import PageHeader from "@src/components/PageHeader"
import { useNavigate, useParams } from "react-router-dom"
import TourPackageCreateCard, { TourPackageCreateRef } from "@src/components/TourPackageCreateCard";
import { CreateTourType, TourType, parseErrorMessage } from '../types';
import { toast } from "react-toastify";
import { getTourById, postTour } from "@src/functions/api";
import { useQueryClient } from "react-query";
import TourUpdateCard, { TourUpdateRef } from "@src/components/TourUpdateCard";
import TourLogUpdateCard, { TourLogUpdateRef } from "@src/components/TourLogUpdateCard";

const UpdateTour = () => {
    let { tourId } = useParams()

    const tourUpdateRef = createRef<TourUpdateRef>()
    const tourLogUpdateRef = createRef<TourLogUpdateRef>()
    const tourPackageCreateRef = createRef<TourPackageCreateRef>()

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        getTourById({ id: Number(tourId) }).then(res => {
            const tour: TourType = res.data;
            if(tourUpdateRef.current){
                tourUpdateRef.current.updateData({
                    ...tour
                })
            }
            if(tourLogUpdateRef.current){
                tourLogUpdateRef.current.updateData([...tour.tour_logs])
            }
            // set data here
        })
    }, [tourId])

    const handleSubmit = async () => {
        if (!tourUpdateRef.current || !tourLogUpdateRef.current || !tourPackageCreateRef.current) {
            return;
        }
        setError("")

        const tour = tourUpdateRef.current.getData();
        if (!tour.organizer || !tour.avatar) {
            return;
        }

        const tour_logs = tourLogUpdateRef.current.getData();
        tour_logs.forEach(e => {
            if (e.hotel == null) {
                toast.error("Tour logs must contain hotel data");
                return;
            }
        })

        const packages = tourPackageCreateRef.current.getData();
        packages.forEach(e => {
            if (e.price == null) {
                toast.error("Package must contain price data");
                return;
            }
        })

        const data: CreateTourType = {
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
        postTour({ ...data }).then(res => {
            if (res.error) {
                toast.error("Tour submission failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Tour Submitted 💪")
                queryClient.invalidateQueries("tours")
                setLoading(false)
                navigate("/tours")
            }

        })
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title="Create A Tour"
                subtitle="Before writing the article please review the contents carefully 🧐"
            />

            <div className="grid grid-cols-1 gap-3">
                <TourUpdateCard ref={tourUpdateRef} />
                <TourLogUpdateCard ref={tourLogUpdateRef} />
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

export default UpdateTour