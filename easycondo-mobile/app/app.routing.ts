import { LoginComponent } from "./pages/login/login.component";
import { ManageCondominiumComponent } from "./pages/manage-condominium/manage.condominium.component";
import { ListCondominiumComponent } from "./pages/list-condominium/list.condominium.component";

export const routes = [
  { path: "", component: ListCondominiumComponent },
  { path: "addCondominium", component: ManageCondominiumComponent },
  { path: "condominium/:id", component: ManageCondominiumComponent },
  { path: "listCondominium", component: ListCondominiumComponent }
];

export const navigatableComponents = [
  ListCondominiumComponent,
  ManageCondominiumComponent,
  LoginComponent
];
