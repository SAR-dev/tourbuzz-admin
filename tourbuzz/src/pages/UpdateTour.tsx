import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createRef, useEffect, useState } from "react"
import ErrorAlert from "@src/components/ErrorAlert"
import PageHeader from "@src/components/PageHeader"
import { useNavigate, useParams } from "react-router-dom"
import { TourType, UpdateTourType, parseErrorMessage } from '../types';
import { toast } from "react-toastify";
import { getTourById, updateTour } from "@src/functions/api";
import { useQueryClient } from "react-query";
import TourUpdateCard, { TourUpdateRef } from "@src/components/TourUpdateCard";
import TourLogUpdateCard, { TourLogUpdateRef } from "@src/components/TourLogUpdateCard";
import TourPackageUpdateCard, { TourPackageUpdateRef } from "@src/components/TourPackageUpdateCard";

const UpdateTour = () => {
    let { tourId } = useParams()

    const tourUpdateRef = createRef<TourUpdateRef>()
    const tourLogUpdateRef = createRef<TourLogUpdateRef>()
    const tourPackageUpdateRef = createRef<TourPackageUpdateRef>()

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
            if(tourPackageUpdateRef.current){
                tourPackageUpdateRef.current.updateData([...tour.packages])
            }
        })
    }, [tourId])

    const handleSubmit = async () => {
        if (!tourUpdateRef.current || !tourLogUpdateRef.current || !tourPackageUpdateRef.current) {
            return;
        }
        setError("")

        const tour = tourUpdateRef.current.getData();
        if (!tour.organizer || !tour.avatar || !tour.tour_type) {
            return;
        }

        const tour_logs = tourLogUpdateRef.current.getData();

        const packages = tourPackageUpdateRef.current.getData();
        packages.forEach(e => {
            if (e.price == null) {
                toast.error("Package must contain price data");
                return;
            }
        })

        const data: UpdateTourType = {
            tour: {
                ...tour,
                id: Number(tourId),
                tour_types_id: tour.tour_type.id,
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
        updateTour({ ...data }).then(res => {
            if (res.error) {
                toast.error("Tour update failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Tour updated 💪")
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
                <TourUpdateCard ref={tourUpdateRef} tourId={Number(tourId)} />
                <TourLogUpdateCard ref={tourLogUpdateRef} tourId={Number(tourId)} />
                <TourPackageUpdateCard ref={tourPackageUpdateRef} tourId={Number(tourId)} />
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