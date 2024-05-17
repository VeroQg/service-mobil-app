

//const { request, gql } = require('graphql-request');
//import { request, gql } from "graphql-request";

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';

const MASTER_URL= "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clw9artqh004u07v1ljaenp6m/master";
//const MASTER_URL= process.env.URL_API_HYGRAPH;

const client = new ApolloClient({
    link: new HttpLink({ uri: MASTER_URL }),
    cache: new InMemoryCache(),
});

const getSlider = async() => {
    const query = gql`
        query GetSlider {
            sliders {
                id
                name
                image {
                    url
                }
            }
        }
    `
    //const result = await request(MASTER_URL, query);

    const result = await client.query({ query });

    return result.data;
}

const getCategories = async() => {
    const query = gql`
        query GetCategory {
            categories {
                id
                name
                icon {
                    url
                }
            }
        }
      
    `
    const result = await client.query({ query });

    return result.data;
}

const getBusinessList = async() => {
    const query = gql`
        query getBusinessList {
            businessLists {
                id
                name
                email
                contactPerson
                category {
                    name
                }
                address
                about
                images {
                    url
                }
            }
        }
      
    `
    const result = await client.query({ query });

    return result.data;
}


export default{
    getSlider,
    getCategories,
    getBusinessList,
}