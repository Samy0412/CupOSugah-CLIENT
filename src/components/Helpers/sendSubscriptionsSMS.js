import axios from "axios";

const fetchFilteredSubscriptions = async (postCategory_id,user2) => {
  const data = await axios.get("/subscriptions");
  const filtered = data.data.filter(
    (subscription) => subscription.category_id === parseInt(postCategory_id)
  );
  const subscriber_ids = filtered.map((entry) => (entry = entry.user_id));
  const phoneData = await axios.get(
    "/users/phone-numbers"
  );
  const phoneFiltered = phoneData.data
    .filter(
      (user) =>
        subscriber_ids.includes(user.id) &&
        user.neighbourhood_id === user2.neighbourhood_id
    )
    .map((entry) => `+${entry.phone_number}`);
  return phoneFiltered;
};

export default async function sendSubscriptionSMS(postCategory_id, title, categories,user2) {
  let categoryName = "";
  for (const category of categories) {
    if (category.id === parseInt(postCategory_id)) {
      categoryName = category.name;
    }
  }
  const phoneNumbers = await fetchFilteredSubscriptions(postCategory_id,user2);
  axios.post("/twilio", { phoneNumbers, categoryName, title });
};
