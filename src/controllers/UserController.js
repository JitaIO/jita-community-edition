import uuid4 from 'uuid/v4';
import crypto from 'crypto';
import apolloClient from './apolloClient';
import gql from 'graphql-tag';
import validator from 'validator';
import dotenv from 'dotenv';

const UserController = {
    getUserByEmail: (req, res, next) => {
        try{
            apolloClient.query({
                variables: {
                    email: req.params.email
                },
                query: gql `
                query User($email: String!) {
                    User(email: $email) {
                        UUID,
                        email,
                        name,
                        activated,
                    }
                }
                `
            })
            .then(data => {
                const User = data.data.User;
                console.log(User);
                
                if(data.data.User != null){
                    res.status(200).json({
                        statusCode: 200,
                        message: "Found you!",
                        userObject: User,
                    })
                    .end();
                } else {
                    res.status(200).json({
                        statusCode: 204,
                        message: "Request successfull. But User doesn't exist!",
                    });
                }
            })
        } catch (err) {
            console.error(err);
            return err;
        }
    },

    activate: (req, res, next) => {
        try{
            res.status(200).json({
                statusCode: 200,
                message: "I'm here to activate!",
            })
            .end();
        } catch (err) {
            console.error(err);
            return err;
        }
    },
}

export default UserController;