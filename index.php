<?php get_header(); ?>

<div class="container">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
  <?php the_content(); ?>
  <?php endwhile; else : ?>
  <div class="loop-error">
    <p class="loop-error__message example">
      <?php _e('Sorry, no posts matched your criteria.'); ?>
    </p>
  </div>
  <?php endif; ?>
  <p class="theme-name">Inception Base</p>
</div>

<?php get_footer(); ?>
