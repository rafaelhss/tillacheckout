package tillacheckout.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by rafa on 28/08/2016.
 */
@Entity
@Setter
@Getter

public class Cliente {
    @Id
    private String contato;
}
