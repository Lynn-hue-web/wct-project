import Navbar from "../../../components/services/navbar/page";
import Mainbody from "../../../components/services/MainBody/page";
import Footer from "../../../components/services/footer/page"
import ServiceCard from "../../../components/services/MainBody/ServiceCard"


export default function Layout() {
  return (
    <div>
      <Navbar />
      <Mainbody />
      <Footer />
      <ServiceCard />
    </div>
  );
}
