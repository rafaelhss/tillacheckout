package tillacheckout.venda;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by rafa on 27/08/2016.
 */
public interface VendaRepository extends CrudRepository<Venda, Long> {
    List<Venda> findByCliente(String cliente);
    List<Venda> findAllByOrderByComprovantePacAsc();
}
