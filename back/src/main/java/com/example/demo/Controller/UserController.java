package com.example.demo.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Config.JwtTokenUtil;
import com.example.demo.Entité.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }
    
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        User user = userService.authenticate(credentials.get("email"), credentials.get("password"));
        System.out.println(user);
        String token = JwtTokenUtil.generateToken(user.getEmail()); // Create a JWT token
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return ResponseEntity.ok(response);
    }

//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody Map<String, String> credentials) {
//        User user = userService.authenticate(credentials.get("email"), credentials.get("password"));
//        return ResponseEntity.ok(user);
//    }
}
