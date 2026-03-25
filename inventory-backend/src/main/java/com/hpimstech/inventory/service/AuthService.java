package com.hpimstech.inventory.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    //function to validate the login
    public String login(String email, String password) {

        //check the email domain whether it is ends with@hpimstech.com
        if (!email.endsWith("@hpimstech.com")) {
            return "Invalid company email";
        }

        //check the password, it is exactly as admin123
        if (!password.equals("admin123")) {
            return "Invalid password";
        }

        return "Login successful";
    }
}