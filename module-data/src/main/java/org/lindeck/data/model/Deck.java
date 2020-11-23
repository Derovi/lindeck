package org.lindeck.data.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.lindeck.data.model.cards.AbstractCard;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@Table(name = "decks")
public class Deck {
    /**
     * Decks can be created locally, so it's good case to user UUID
     */
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",
                      strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @ManyToOne
    private DeckMember author;

    @OneToMany
    private List<DeckMember> members;

    /**
     * Pubic key used to share deck by link
     * TODO add generator
     */
    private String publicKey;

    /**
     * Card can belong to ONLY one deck.
     * Fetch type is lazy, because there are can be many cards,
     * and queries, where we don't need to access them are frequently.
     */
    @OneToMany(fetch = FetchType.LAZY)
    private List<AbstractCard> cards;

    @OneToMany(fetch = FetchType.LAZY)
    private List<DeleteRecord> deleteRecords;
}
