import { Team } from "../interfaces/team";
import { performPostRequest, performDeleteRequest, performUpdateRequest } from "./utils";

export const createTeam = async (teamData : Team) => await performPostRequest("/teams/signup", teamData);

export const deleteTeam = async (id : number) => await performDeleteRequest("/teams/", id);

export const editTeam = async (teamData : Team, id : number) => await performUpdateRequest("/teams/", id, teamData);
