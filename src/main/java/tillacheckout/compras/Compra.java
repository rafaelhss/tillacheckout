package tillacheckout.compras;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by rafa on 23/10/2016.
 */
@Setter
@Getter
@Entity
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date data;
    private String produto;
    private int quantidade;
    private String rastreio;
    private boolean recebida;
}
