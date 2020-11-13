export default function filterByCategory(listings, filter, categories) {
    if (!filter) {
        return listings;
    }
    const selected = categories.filter(category => category.name === filter)
    return listings.filter(listing => listing.category_id === selected[0].id)
};