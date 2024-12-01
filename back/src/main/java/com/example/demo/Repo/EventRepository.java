package com.example.demo.Repo;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.Entité.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategoryContainingOrTitleContaining(String category, String title);
    List<Event> findByOrganizerId(Long organizerId);
    List<Event> findByDateBetween(Date startDate, Date endDate);
}
