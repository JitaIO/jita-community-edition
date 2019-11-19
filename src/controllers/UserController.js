import {isNil} from 'lodash';
import bcrypt from 'bcrypt';
import uuid4 from 'uuid/v4';
import crypto from 'crypto';
import apolloClient from './apolloClient';
import gql from 'graphql-tag';
import validator from 'validator';
import dotenv from 'dotenv';
import { getNow } from '../lib/Utils';
import authService from '../services/authService';

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

                if(User != null){
                    res.status(200).json({
                        statusCode: 200,
                        message: "Found you!",
                        userObject: User,
                    })
                    .end();
                } else {
                    res.status(204).json({
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

    signupWithProject: (req, res, next) => {
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
                if(User != null){
                    if(User.activate == true){
                        res.status(200).json({
                            statusCode: 200,
                            message: "User with this email exists. Please sign in!",
                        })
                        .end();
                    } else {
                        res.status(200).json({
                            statusCode: 200,
                            message: "An email has been sent to you to help you activate your account",
                        })
                        .end();
                    }
                } else {
                    // User does not exist, creating user
                    apolloClient.mutate({
                        variables: {
                            UUID: uuid4(),
                            email: req.params.email,
                            name: req.params.name,
                            password: req.params.password,
                            created_date: getNow(),
                            last_edited: getNow(),
                        },
                        mutation: gql `
                        mutation CreateUser($UUID: UUID!, $email: String!, $name: String, $password: String!) {
                            CreateUser(UUID: $UUID, email: $email, name: $name, password: $password) {
                                UUID,
                                email,
                                name,
                                activated,
                                hash,
                            }
                        }
                        `
                    })
                    .then(data => {
                        const User = data.data.User;
                        console.log(User);

                        if(User != null){
                            res.status(200).json({
                                statusCode: 200,
                                message: "User created!",
                                userObject: User,
                            })
                            .end();
                        } else {
                            res.status(404).json({
                                statusCode: 404,
                                message: "User not created!",
                            })
                            .end();
                        }
                    });
                }
            });
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

    signin: (req, res, next) => {
        let access_token = null;
        let refresh_token = null;
        let message = null;
        let status = false;

        const email = req.body.email;
        const password = req.body.password;

        if (isNil(email) || isNil(password)) {
            message = 'Email and password is required!!!';
            res.status(400).json({message}).end();
            return
        }

        try{
            apolloClient.query({
                variables: {
                    email,
                    hash: bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                },
                query: gql `
                query User($email: String!) {
                    User(email: $email) {
                        UUID,
                        email,
                        name,
                        activated,
                        hash,
                    }
                }
                `
            })
            .then(async (data) => {
                const User = data.data.User;
                if (isNil(User)){
                    message = 'Accout not found!';
                } else if (await bcrypt.compare(password, User.hash) == false) {
                    message = 'Password wrong!';
                } else if(User.activate == false){
                    message = 'Account not activate!!!';
                } else {
                    status = true;
                    access_token = authService.getAccessToken(User.UUID)
                    refresh_token = authService.getRefreshToken(User.UUID)
                }
                res.status(200).json({success: status, access_token, refresh_token, message}).end();
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({error: err.message});
        }
    },
}

export default UserController;