import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Redirect, Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import { BookingModalProvider } from "./contexts/BookingModalContext";
import Home from "./pages/Home";
import ChatWidget from "./components/ChatWidget";
import Pricing from "./pages/Pricing";
import ReferFriend from "./pages/ReferFriend";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogGroomingSigns from "./pages/BlogGroomingSigns";
import BlogDogPersonalities from "./pages/BlogDogPersonalities";
import BlogSummerHeat from "./pages/BlogSummerHeat";
import GroomingGallery from "./pages/GroomingGallery";
import Boarding from "./pages/Boarding";
import Grooming from "./pages/Grooming";
import Daycare from "./pages/Daycare";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Tour from "./pages/Tour";
import VetReferred from "./pages/VetReferred";
import AdminPromos from "./pages/AdminPromos";
import AdminMessages from "./pages/AdminMessages";
import GetStarted from "./pages/GetStarted";
import CustomerLoginRedirect from "./pages/CustomerLoginRedirect";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/book"}><Redirect to="/get-started" /></Route>
      <Route path={"/refer"} component={ReferFriend} />
      <Route path={"/careers"} component={Careers} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/5-signs-your-dog-is-ready-for-a-groom"} component={BlogGroomingSigns} />
      <Route path={"/blog/which-one-is-your-dog"} component={BlogDogPersonalities} />
      <Route path={"/blog/too-hot-for-the-dog-park"} component={BlogSummerHeat} />
      <Route path={"/blog/:slug"} component={BlogPost} />
      <Route path={"/grooming-gallery"} component={GroomingGallery} />
      <Route path={"/boarding"} component={Boarding} />
      <Route path={"/grooming"} component={Grooming} />
      <Route path={"/daycare"} component={Daycare} />
      <Route path={"/services"} component={Services} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/tour"} component={Tour} />
      <Route path={"/vet-referred"} component={VetReferred} />
      <Route path={"/get-started"} component={GetStarted} />
      <Route path={"/customer-login"} component={CustomerLoginRedirect} />
      <Route path={"/booking"}><Redirect to="/get-started" /></Route>
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsOfService} />
      <Route path={"/admin/promos"} component={AdminPromos} />
      <Route path={"/admin/messages"} component={AdminMessages} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <BookingModalProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
            <ChatWidget />
          </BookingModalProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
