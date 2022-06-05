import { AxiosResponse } from "axios";
import { instance } from "./apiCfg";

export const packsAPI = {
	getPacks(payload?: PacksDataType) {
		return instance.get<PacksResponseType>('/cards/pack/', { params: payload });
	},
	addPack(payload: NewPackType) {
		return instance.post<NewPackType, AxiosResponse<PackType>>('/cards/pack/', payload);
	},
	deletePack(id: string) {
		return instance.delete<string, AxiosResponse<PackType>>('/cards/pack/', { params: id });
	},
	updatePack(payload: UpdatedPackType) {
		return instance.put<UpdatedPackType, AxiosResponse<PackType>>('/cards/pack/', payload);
	},
}

// types

type PacksDataType = {
	packName?: string;
	sortPacks?: number;
	min?: number;
	max?: number;
	page?: number;
	pageCount?: number;
	user_id?: string;
}

type PacksResponseType = {
	cardPacks: PackType[];
	cardPacksTotalCount: number;
	maxCardsCount: number;
	minCardsCount: number;
	page: number;
	pageCount: number;
}

type PackType = {
	cardsCount: number
	created: string
	grade: number
	more_id: string
	name: string
	path: string
	private: boolean
	rating: number
	shots: number
	type: string
	updated: string
	user_id: string
	user_name: string
	__v: number
	_id: string
}

type NewPackType = {
	cardsPack: Omit<CardsPackPropertiesType, '_id'>;
}

type UpdatedPackType = {
	cardsPack: CardsPackPropertiesType;
}

type CardsPackPropertiesType = {
	_id: string;
	name?: string;
	path?: string;
	grade?: number;
	shots?: number;
	rating?: number;
	deckCover?: string;
	private?: boolean;
	type?: 'pack' | 'folder';
}
