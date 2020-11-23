package org.lindeck.data.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

/**
 * @author derovi
 * Table per class strategy has been chosen because:
 * 1) Many field differ in subclasses, so TABLE_PER_CLASS inheritance type will cause
 * a lot of fields, that always null in database.
 * 2) We need polymorphic queries, so MappedSuperclass inheritance can't be used.
 * 3) We need efficient polymorphic queries, so we should use TABLE_PER_CLASS instead of JOINED inheritance type,
 * because TABLE_PER_CLASS uses UNION instead of LEFT JOIN in queries.
 * 4) We can use TABLE_PER_CLASS because it is no need to use auto-generated values in database,
 * because we use UUID instead of consistent id.
 */

@Entity
@Data
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class AbstractCard {
    /**
     * Cards can be created locally, so it's good case to user UUID
     */
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    private String text;

    @ManyToOne
    private Deck deck;
}
