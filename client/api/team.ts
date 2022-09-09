import { Team } from "../interfaces/team";
import { performPostRequest } from "./utils";

export const createTeam = async (teamData : Team) => await performPostRequest("/teams/signup", teamData);
