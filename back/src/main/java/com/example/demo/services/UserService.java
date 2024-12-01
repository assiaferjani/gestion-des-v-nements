package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Entité.User;
import com.example.demo.Repo.UserRepository;

@Service
public class UserService {

    // Injection automatique du dépôt utilisateur
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Hachage du mot de passe avant de sauvegarder l'utilisateur
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        // Enregistrement de l'utilisateur dans la base de données via le repository
        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        // Recherche de l'utilisateur dans la base de données par email
        User user = userRepository.findByEmail(email)
                                   .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        // Vérification du mot de passe en utilisant BCryptPasswordEncoder
        if (new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            // Si le mot de passe correspond, retourner l'utilisateur
            return user;
        } else {
            // Sinon, lancer une exception pour mauvaises informations d'identification
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}