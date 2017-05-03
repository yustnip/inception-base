<?php get_header(); ?>

<div class="container">
  <div class="row">
    <div class="col-md-12">

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <?php the_content(); ?>
      <?php endwhile; else : ?>
      @@include('loop-error.php')
      <?php endif; ?>

      <p bClass="b('theme-name')">Inception Base</p>
    </div>
  </div>
</div>

<?php get_footer(); ?>
