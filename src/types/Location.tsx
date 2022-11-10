export type IAddress = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
};

export type ILocation = {
  active: boolean;
  address: IAddress;
  id: number;
  latitude: number;
  locationDetails?: string;
  locationId: string;
  locationName: string;
  locationType: string;
  locationUserRole: string;
  longitude: number;
  newLocation: boolean;
  numberofDevices: number;
  subscriptionActive: true;
};

export type IResponseData = {
  locations: ILocation[];
  numberofLocations: number;
};
