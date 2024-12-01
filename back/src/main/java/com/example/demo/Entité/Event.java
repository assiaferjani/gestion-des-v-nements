package com.example.demo.Entité;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

@Entity
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id;

	@Column(nullable = false) 
	private String title;

	@Column(nullable = false)
	private String category;

	@Column(nullable = false) 
	private String location;

	@Column(nullable = true)
	private Date date;

	
	private String imageUrl;

	@ManyToOne
	@JoinColumn(name = "organizer_id") 
	@JsonIdentityReference(alwaysAsId = true) // Sérialise uniquement l'ID de l'organisateur dans le JSON.
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // Utilise l'ID comme identifiant JSON pour éviter la duplication et les cycles d'objets.
	private User organizer;

	@ManyToMany(mappedBy = "registeredEvents")
	@JsonIgnore // Exclut la liste des participants de la sérialisation JSON pour éviter les cycles ou une surcharge inutile.
	private List<User> participants;

	
	public Event() {
	}

	public Event(String title, String category, String location, Date date) {
		this.title = title;
		this.category = category;
		this.location = location;
		this.date = date;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public User getOrganizer() {
		return organizer;
	}

	public void setOrganizer(User organizer) {
		this.organizer = organizer;
	}

	public List<User> getParticipants() {
		return participants;
	}

	public void setParticipants(List<User> participants) {
		this.participants = participants;
	}
}
