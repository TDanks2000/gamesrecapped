import ConferenceDropdownSelect from "@/components/views/homeConferenceSelectDropdown/select";
import { getConferences } from "@/lib/fetchers";

const HomeConferenceSelectDropdown = async () => {
  const conferences = await getConferences();

  return <ConferenceDropdownSelect options={conferences} />;
};

export default HomeConferenceSelectDropdown;
