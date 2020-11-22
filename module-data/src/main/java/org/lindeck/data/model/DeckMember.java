package org.lindeck.data.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.lindeck.data.common.UserRole;

import javax.persistence.*;

/**
 * DeckMember is wrapper under User, that adds user role
 */

@Data
@NoArgsConstructor
@Entity
public class DeckMember {
    @Id
    @GeneratedValue
    private int id;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @ManyToOne
    private User user;
}
