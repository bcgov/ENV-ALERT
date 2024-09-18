type FeatureResponse = {
    features: {
        properties: {
            GNIS_NAME_1: string,
        },
        geometry: {
            id: string,
            geometry_name: string,
            type: string,
            coordinates: [number,number][]
        }
    }[]
  };
  
  export default FeatureResponse;
  