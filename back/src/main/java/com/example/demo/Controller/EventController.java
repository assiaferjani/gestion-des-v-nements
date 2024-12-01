package com.example.demo.Controller;
import com.example.demo.Repo.EventRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Config.JwtTokenUtil;
import com.example.demo.Dto.EventDTO;
import com.example.demo.Entité.Event;
import com.example.demo.Entité.User;
import com.example.demo.Repo.UserRepository;
import com.example.demo.services.EventService;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private EventService eventService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    
    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents(@RequestHeader("Authorization") String authHeader) {
        System.out.println("Adem ytesti fl afficher tous");
        String token = authHeader.replace("Bearer ", "");
        String email = JwtTokenUtil.decodeToken(token).split(":")[0];
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Logic here for retrieving events based on user if needed
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping("/create")
    public ResponseEntity<EventDTO> createEvent(@RequestBody Event event, @RequestHeader("Authorization") String authHeader) {
    	System.out.println("Adem ytesti fl create");

    	// Bearer bWVkZGRlYmFkZW0wMEBnbWFpbC5jb206MTczMTg3ODg3NzQ5NA==    => bWVkZGRlYmFkZW0wMEBnbWFpbC5jb206MTczMTg3ODg3NzQ5NA==
    	String token = authHeader.replace("Bearer ", "");
    	String email = (JwtTokenUtil.decodeToken(token)).split(":")[0];
    	User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        event.setOrganizer(user);
        EventDTO savedEventDto = eventService.createEvent(event);

        return ResponseEntity.ok(savedEventDto);
    }

    @GetMapping
    public ResponseEntity<List<Event>> searchEvents(@RequestParam(required = false) String category,
                                                    @RequestParam(required = false) String title,
                                                    @RequestHeader("Authorization") String authHeader) {
        System.out.println("Adem ya3ml f search");
        String token = authHeader.replace("Bearer ", "");
        String email = JwtTokenUtil.decodeToken(token).split(":")[0];
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Logic here for retrieving events based on search parameters
        List<Event> events = eventService.searchEvents(category, title);
        return ResponseEntity.ok(events);
    }

    @PostMapping("/{eventId}/register")
    public ResponseEntity<Void> registerForEvent(@PathVariable Long eventId,
                                                 @RequestHeader("Authorization") String authHeader) {
        System.out.println("Adem ya3ml registration f event");
        String token = authHeader.replace("Bearer ", "");
        String email = JwtTokenUtil.decodeToken(token).split(":")[0];
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        eventService.registerForEvent(eventId, user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Event> updateEvent(
            @PathVariable Long id,
            @RequestBody @Valid EventDTO eventDTO,
            @RequestHeader("Authorization") String authHeader) {
			        // Extraire le token et l'email
			        String token = authHeader.replace("Bearer ", "");
			        String email = JwtTokenUtil.decodeToken(token).split(":")[0];
			
			        // Trouver l'utilisateur
			        User user = userRepository.findByEmail(email)
			                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
			
			        // Mettre à jour l'événement
			        Event updatedEvent = eventService.updateEvent(id, eventDTO, user.getId());
			        return ResponseEntity.ok(updatedEvent);
    }

    // Endpoint pour supprimer un événement
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        // Supprimer les utilisateurs inscrits à l'événement
        userRepository.deleteByRegisteredEventsId(id);  // Utilise la méthode dans UserRepository

        // Supprimer l'événement
        eventRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Event>> getEvent(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.replace("Bearer ", "");
        String email = JwtTokenUtil.decodeToken(token).split(":")[0];
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Optional<Event> event = eventRepository.findById(id);
        return ResponseEntity.ok(event);
    }
}