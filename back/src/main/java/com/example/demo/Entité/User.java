package com.example.demo.Entité;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @OneToMany(mappedBy = "organizer", cascade = CascadeType.ALL)
	@JsonIgnore // Ignore la liste des événements organisés
    private List<Event> organizedEvents;

	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name = "user_events",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "event_id")
	)
	private List<Event> registeredEvents;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<Event> getOrganizedEvents() {
		return organizedEvents;
	}

	public void setOrganizedEvents(List<Event> organizedEvents) {
		this.organizedEvents = organizedEvents;
	}

	public List<Event> getRegisteredEvents() {
		return registeredEvents;
	}

	public void setRegisteredEvents(List<Event> registeredEvents) {
		this.registeredEvents = registeredEvents;
	}
    
    

}