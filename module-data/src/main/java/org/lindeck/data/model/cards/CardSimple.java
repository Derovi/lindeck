package org.lindeck.data.model.cards;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;

/**
 * @author derovi
 * This card has no answer, just information.
 * CardSimple has no fields, that extend AbstractCard,
 * BUT it can change later!
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class CardSimple extends AbstractCard {
}
