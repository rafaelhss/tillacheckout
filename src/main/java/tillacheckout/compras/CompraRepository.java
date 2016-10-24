package tillacheckout.compras;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by rafa on 23/10/2016.
 */
public interface CompraRepository extends CrudRepository<Compra, Long> {
    List<Compra> findByRecebida(boolean recebida);
}
