export default function filterByNeighbourhood(array, userNeighbourhoodID) {
    return array.filter(posting => posting.neighbourhood_id === userNeighbourhoodID)
}