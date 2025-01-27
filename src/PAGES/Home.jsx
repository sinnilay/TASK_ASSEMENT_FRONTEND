import Navbar from "../COMPONENTS/Navbar";
import UserForm from "../COMPONENTS/Userform";
import Objective from "../COMPONENTS/OBJECTIVE";
import Footer from "../COMPONENTS/Fotter";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Objective />
     
        

        <UserForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
