import { render, screen } from "@testing-library/react"
import {BrowserRouter as Router} from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import SideBar from "../SideBar";


test('render SideBar if logged in', async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <SideBar />
      </CurrentUserProvider>
    </Router>    
  );
  const messageLink = await screen.findByRole('link', {name:'Messages'});
  expect(messageLink).toBeInTheDocument();
});
