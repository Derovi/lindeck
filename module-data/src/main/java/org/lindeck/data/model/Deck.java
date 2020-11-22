package org.lindeck.data.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "decks")
public class Deck {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    private DeckMember author;

    @OneToMany
    private List<DeckMember> members;

    private String publicKey;

    @OneToMany
    private List<DeleteRecord> deleteRecords;
}
