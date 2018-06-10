import { LoginComponent } from "./pages/login/login.component";
import { AddCondominiumComponent } from "./pages/add-condominium/add.condominium.component";
import { ListCondominiumComponent } from "./pages/list-condominium/list.condominium.component";

export const routes = [
  { path: "", component: ListCondominiumComponent },
  { path: "addCondominium", component: AddCondominiumComponent },
  { path: "listCondominium", component: ListCondominiumComponent }
];

export const navigatableComponents = [
  ListCondominiumComponent,
  AddCondominiumComponent,
  LoginComponent
];
