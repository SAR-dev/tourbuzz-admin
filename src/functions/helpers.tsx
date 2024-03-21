import { ImageType } from '../types';
import { MAP_ID_REGEX, MAP_LINK_REGEX } from "@src/constants/values";

export function timestampToYYYYMMDD(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export function timestampToDDMMYYYY(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${day}/${month}/${year}`;
}

export function timestampToYYYYMMDDHHMMSS(timestamp: string) {
    const dateObj = new Date(timestamp);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export function generateSlug(title: string) {
    return title.trim()                     // Remove leading and trailing spaces
        .toLowerCase()                       // Convert to lowercase
        .replace(/\s+/g, '-')                // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '')             // Remove non-word characters except hyphens
        .replace(/^-+|-+$/g, '');            // Remove leading and trailing hyphens
}

export function findMaxContinuous(arr: number[]) {
    let max = arr[0]; // Initialize max with the first element of the array
    let currentMax = arr[0]; // Initialize currentMax with the first element of the array

    for (let i = 1; i < arr.length; i++) {
        // For each element in the array starting from the second element
        currentMax = Math.max(arr[i], currentMax + arr[i]); // Update currentMax
        max = Math.max(max, currentMax); // Update max
    }

    return max;
}

export function convertToNDigit(number: number, n: number) {
    return String(number).padStart(n, '0');
}

export function getSortedArray(inputArray: number[]) {
    return Array.from(new Set(inputArray)).sort((a, b) => a - b);
}

export const checkMapLink = (link: string) => {
    if (MAP_LINK_REGEX.test(link)) {
        return true;
    }
    return false;
}

export const getMapIdFromLink = (link: string) => {
    const match = MAP_ID_REGEX.exec(link);
    console.log(match)
    if (match) {
        return match[1].toUpperCase();
    } else {
        return null;
    }
}

export const getImageTypeFromUrl = (url: string) => {
    const image: ImageType = {
        id: 0,
        title: "",
        source_url: url,
        thumbnail_url: url,
        optimized_url: url,
        created_at: "",
        updated_at: ""
    }
    return image;
}

export const checkImageUrl = (url: string, onSuccess: () => void, onError: () => void) => {
    const img = new Image();

    img.onload = function () {
        onSuccess();
    };

    img.onerror = function () {
        onError();
    };

    img.src = url;
}