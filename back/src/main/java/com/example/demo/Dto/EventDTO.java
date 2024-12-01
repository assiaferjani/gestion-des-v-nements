package com.example.demo.Dto;

import jakarta.validation.constraints.Size;

import java.util.Date;

public class EventDTO {
    private Long id;
    private String title;
    private String category;
    private String location;
    private Date date;
	@Size(max = 2048, message = "L'URL de l'image ne doit pas dépasser 2048 caractères.")
	private String imageUrl;

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
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

    
}

